import Item from './Item';

export default interface Profile {
  profileName?: string;
  menuId?: string;
  _id?: string;
  id?: string;
  menu?: {
    _id?: string;
    id?: string;
    items: Item[];
  };
  newItemId?: string;
  contentEditable?: boolean;
}
