import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { retrieve, create, update, remove } from '../model/invite';
import { retrieve as retrieveAccount } from '../model/account';
import { Invite } from '../types/invite';
import { currentTimeStamp, validateUUID } from './utilities';
import { sendEmail } from '../nodemailer/nodemailer';

export const createInvite = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;
  let inviteData: Invite;

  // Ensure email input is correct
  const emails = req.body.emails.replace(/\s+/g, ' ').split(' ');

  // Ensure accountId params is not malformed
  await validateUUID({ accountId });

  // Ensure accountId params exists
  const account = await retrieveAccount(accountId, null);

  if (!account) throw new CustomError(404, 'Account does not exist');

  // Check length
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
