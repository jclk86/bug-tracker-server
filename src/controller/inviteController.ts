import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { retrieve, create, update, remove } from '../model/invite';
import { Invite } from '../types/invite';
import { currentTimeStamp } from './utilities';
import { sendEmail } from '../nodemailer/nodemailer';

// show user that is already in db
// ! change into 1 get
// ! INVITE FORM is available AFTER account owner has registered, invited himself, created his user account
// ! From his dashboard, he can invite other users and possible give access to other users to invite as well-- where then
// ! once given access, that invite form link would appear in that user's dashboard as well.
export const createInvite = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;
  let inviteData: Invite;
  // ! remove whitespace more than 1 and split emails - front end duty?
  const emails = req.body.emails.replace(/\s+/g, ' ').split(' ');

  // check length
  if (emails.length > 10) throw new CustomError(400, 'Only 10 emails max per invite');

  for (const email of emails) {
    inviteData = await retrieve(accountId, email as string);

    if (inviteData) {
      await update(inviteData.id, currentTimeStamp);
    } else {
      inviteData = {
        id: uuidv4(),
        account_id: accountId,
        date_sent: currentTimeStamp,
        email: email
      };
      await sendEmail(email, accountId);
      await create(inviteData);
    }
  }

  const msg = emails.length > 1 ? 'Invites sent' : 'Invite sent';
  res.status(200).send({ message: msg, data: inviteData.id });
};

export const deleteInvite = async (req: Request, res: Response): Promise<void> => {
  const email = req.body.email as string;

  const invite = await retrieve(null, email);

  if (!invite) throw new CustomError(404, 'Invite does not exist');

  await remove(email);

  res.status(200).send({ message: 'Invite was successfully deleted' });
};
