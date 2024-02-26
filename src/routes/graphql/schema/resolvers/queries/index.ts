import { Detail, User } from '@/interfaces/user';
import { accountsService } from '@/services';

export default {
  user: async (
    parent: Object,
    args: { user: User },
    context: Object,
    info: Object
  ): Promise<Detail> => {
    console.log(args);
    const data: Detail = await accountsService.detail(args.user);
    return data;
  },
  logout: async (
    parent: Object,
    args: { user: User },
    context: Object,
    info: Object
  ): Promise<null> => {
    await accountsService.logout(args.user);
    return null;
  },
};
