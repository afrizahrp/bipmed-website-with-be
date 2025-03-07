// import getBillboard from '@/actions/get-billboard';
// import BillboardPage from './billboard/billboard';
import CustomProductContent from './contentPages/customProducts';
import TkdnProductContent from './contentPages/tkdnProduct';
import NewestProduct from './contentPages/newestProduct';
// import { useBillboards } from '@/hooks/use-billboard';

const CompanyPage = async () => {
  // const billboardData = await getBillboard({ iShowedStatus: true });

  return (
    <>
      <div className='space-y-1 pb-3'>
        {/* <BillboardPage data={billboardData[0]} /> */}

        {/* </div> */}

        <NewestProduct />

        {/* <div> */}
        <CustomProductContent />
        {/* </div> */}

        {/* <div> */}
        <TkdnProductContent />
      </div>
    </>
  );
};

export default CompanyPage;
