import { Comment } from './Comments';
export interface Dish {
  id: string;
  name: string;
  image: string;
  category: string;
  featured: boolean;
  label: string;
  price: string;
  description: string;
}
// Dishes with details
export interface DishDetail extends Dish {
  comments?: Array<Comment>;
}
