import Filter from '../components/Filter';
import Table from '../components/Table';
import style from './Home.module.css';

function Home() {
  return (
    <div className={style.main}>
      <h1 className={style.h1}>Planets Star Wars</h1>
      <Filter />
      <Table />
    </div>
  );
}

export default Home;
