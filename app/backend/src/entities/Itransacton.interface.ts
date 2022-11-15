import Iaccount from './Iaccount.interface';

interface Itransaction {
  id?: number;
  debtedAccountId?: Iaccount;
  creditedAccoutId: Iaccount;
  value: number;
  createdAt?: Date;
}

export default Itransaction;
