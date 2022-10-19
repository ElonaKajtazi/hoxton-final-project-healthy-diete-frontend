export type UserType = {
  id: number;
  email: string;
  avatar: string;
  name: string;
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
    name: string;
    avatar: string;
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
export type DataType = {
  user: UserType;
  token: string;
};
export type HomeTweetType = {
  id: number;
  text: string;
  image: string | null;
  authorId: number;
  time: string;
  selectedTopicUserId: null | number;
  selectedTopicTopicId: number;
  author: {
    id: number;
    name: string;
    avatar: string;
    email: string;
    password: string;
    twwetTicket: number;
    commentTicket: number;
  };
  comments: {
    id: number;
    text: string;
    image: null;
    time: string;
    authorId: number;
    tweetId: number;
  }[];
  likes: LikeType[];
  selectedTopic: null | SelectedTopicType;
};

export type LikeType = {
  userId: 2;
  tweetId: 1;
  commentId: null | number;
};
