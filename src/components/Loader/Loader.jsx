import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#6f9bd1"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
