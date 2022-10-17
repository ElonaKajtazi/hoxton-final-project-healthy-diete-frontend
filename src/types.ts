export type UserType = {
  id: number;
  email: string;
  password: string;
  twwetTicket: number;
  commentTicket: number;
  tweets: TweetType[];
  selectedTopics: SelectedTopicType[];
  notifications: NotificationType[];
};

export type TweetType = {
  id: number;
  text: string;
  authorId: number;
  time: string;
  selectedTopicId: number | null;
  author: {
    id: number;
    email: string;
    password: string;
    twwetTicket: number;
    commentTicket: number;
  };
};

export type TopicType = {
  id: number;
  avatar: string;
  name: string;
};
export type SelectedTopicType = {
  id: number;
  userId: number;
  topicId: number;
  topic: TopicType;
};
export type NotificationType = {
  id: number;
  text: string;
  time: string;
  userId: number;
};
export type DataType ={
    user: UserType,
    token: string
}