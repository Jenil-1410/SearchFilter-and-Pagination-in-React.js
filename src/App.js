import { useEffect, useState } from "react";
import axios  from 'axios'

function App() {

  const [user, setUser] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
  .get('https://65fd09019fc4425c65310504.mockapi.io/Users')
  .then((res) => setUser(res.data))
  .catch((e) => console.log(e.message))
  }, [currentPage, itemsPerPage])

  const totalPages = user ? Math.ceil(user.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = user?.slice(startIndex, endIndex);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  const [search, setSearch] = useState('')

  function prevPage() {
    if(currentPage !== 1){
      setCurrentPage(currentPage-1)
    }
  }

  function nextPage() {
    if(currentPage !==  totalPages){
      setCurrentPage(currentPage + 1)
    }
  }

  function changeCpage(i) {
    setCurrentPage(i)
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="font-bold text-4xl my-5">Search Filter</h1>
      <div className="w-11/12 h-fit">
        <form className="w-full my-3">
          <input className="p-1 w-full border border-black rounded" type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
        </form>
        <table className="w-full text-center">
          <thead>
            <tr className='border-y-4 bg-black text-white'>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact No</th>
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.length > 0 &&
            currentItems.filter((d) => search.toLowerCase() === '' ? d : d.name.toLowerCase().includes(search.toLowerCase()))
            .map((d,i) => i%2 === 0 ? (
              <tr key={d.id} className="border-y-2 bg-red-200">
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
              </tr>
            ) : <tr key={d.id} className="border-y-2 bg-red-400">
            <td>{d.id}</td>
            <td>{d.name}</td>
            <td>{d.email}</td>
            <td>{d.phone}</td>
          </tr>)}            
          </tbody>
        </table>
        <div>
          <nav>
            <ul className="flex mt-3">
              <li><button className="border rounded-l-md border-black border-collapse px-2" onClick={prevPage}>Pre</button></li>
              {
                (numbers?.length > 0) && numbers.map((n,i) => (
                  <li key={i}><button className={`${currentPage === n ? 'font-extrabold bg-gray-400' : ''} border border-black border-collapse px-2`} onClick={() => changeCpage(n)}>{n}</button></li>
                ))
              }
              <li><button className="border rounded-r-md border-black border-collapse px-2" onClick={nextPage}>Next</button></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default App;