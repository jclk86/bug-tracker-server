export interface BaseComment {
  content: string;
}

export type UpdateComment = BaseComment;

export interface Comment extends BaseComment {
  date_created: string;
  ticket_id: string;
  user_id: string;
}
