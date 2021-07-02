export interface BaseComment {
  content: string;
}

export interface UpdateComment extends BaseComment {
  last_edited: string;
}

export interface Comment extends BaseComment {
  id: string;
  date_created: string;
  ticket_id: string;
  user_id: string;
}
