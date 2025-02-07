import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import BrandSix from '../../images/brand/brand-06.svg';
import BrandSeven from '../../images/brand/brand-07.svg';
import BrandEight from '../../images/brand/brand-08.svg';

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Reliance',
    trend: 'Bullish',
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: BrandTwo,
    name: 'TCS',
    trend: 'Bearish',
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: BrandThree,
    name: 'HDFCBANK',
    trend: 'Bullish',
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
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
    logo: BrandFive,
    name: 'KOTAKBANK',
    trend: 'Bearish',
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
  },
  {
    logo: BrandSix,
    name: 'TATA',
    trend: 'Bullish',
    revenues: '2,564',
    sales: 390,
    conversion: 4.2,
  },
  {
    logo: BrandSeven,
    name: 'HCLTECH',
    trend: 'Bearish',
    revenues: '5,982',
    sales: 390,
    conversion: 4.2,
  },
  {
    logo: BrandEight,
    name: 'Wipro',
    trend: 'Bullish',
    revenues: '2,452',
    sales: 390,
    conversion: 4.2,
  },
];

const TableOne = () => {
  return (
    <div className="w-150 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Stocks
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
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

          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Trend
            </h5>
          </div>
          
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3  sm:grid-cols-2git ${
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

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className={`
              ${
                brand.trend === 'Bullish'
                  ? 'text-green-500'
                  : brand.trend === 'Bearish'
                    ? 'text-red-500'
                    : 'text-gray-500' // Optional: Default color if trend is neither
              }
            `}
              >
                {brand.trend}</p>
            </div>

           
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
