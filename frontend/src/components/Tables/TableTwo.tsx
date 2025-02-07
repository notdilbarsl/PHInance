import { BRAND } from '../../types/brand';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandNine from '../../images/brand/brand-09.svg';
import BrandTen from '../../images/brand/brand-10.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandEleven from '../../images/brand/brand-11.svg';

const brandData: BRAND[] = [
  {
    logo: BrandTwo,
    name: 'TCS',
    trend: 'Bearish',
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
  },
 
  {
    logo: BrandFour,
    name: 'SBIN',
    trend: 'Bullish',
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
  },

  {
    logo: BrandNine,
    name: 'NTPC',
    trend: 'Bullish',
    revenues: '1,354',
    sales: 389,
    conversion: 2.5,
  },

  {
    logo: BrandTen,
    name: 'Maruti',
    trend: 'Bullish',
    revenues: '6,895',
    sales: 389,
    conversion: 2.5,
  },

  {
    logo: BrandEleven,
    name: 'Titan',
    trend: 'Bullish',
    revenues: '2,078',
    sales: 389,
    conversion: 2.5,
  },

];

const TableTwo = () => {
  return (
    <div className="w-100 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Watchlist
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Company
            </h5>
          </div>
         
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Price
            </h5>
          </div>
          
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-2 sm:grid-cols-2git ${
              key === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={brand.logo} style={{width:"50px"}} alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">₹{brand.revenues}</p>
            </div>

           
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableTwo;
