import './App.css';
// import '/images/icons/plus.svg'
import plusicon from "./icons/plus.svg"
import bulb from './icons/light-bulb.svg'
import cross from './icons/cross.svg'
import updownarrow from './icons/up-down.svg'
import layout from './icons/layout.svg'
import rows from './icons/rows.svg'
import rightarrow from './icons/right-arrow.svg'
import dots from './icons/dots.svg'
import filter from './icons/filter.svg'

import axios from 'axios'
import _ from 'lodash'


import { motion, useDragControls } from 'framer-motion'
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const controls = useDragControls();
  const [Search, setSearch] = useState('')




  // const options = {
  //   method: 'GET',
  //   url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
  //   params: {
  //     q: 'taylor swift',
  //     pageNumber: '1',
  //     pageSize: '20',
  //     autoCorrect: 'true',
  //     fromPublishedDate: 'null',
  //     toPublishedDate: 'null'
  //   },
  //   headers: {
  //     'X-RapidAPI-Key': 'f167843fedmshab16c85aa0da556p1fe146jsn6cd755670b8d',
  //     'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
  //   }
  // };





  useEffect(() => {
    async function GetNews() {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=2f708f6266094c48b83fc0e4ea422d96&page=1&pageSize=20`;
      try {
        const response = await axios.get(url)
        setData(response.data.articles)
      } catch (error) {
        console.log(error);
        window.alert(error?.response?.data.message);
      }
    }
    GetNews()

  }, [])

  const sortdata = () => {
    var sortedData = _.sortBy(data, 'title');
    setData(sortedData)
  }


  const variants = {

    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    },

    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  return (
    <div >

      <div className='w-full'>
        <h1 className='text-center mt-10 font-bold text-2xl'>File Model In React JS</h1>

        <div class="p-2 w-full">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(isOpen => !isOpen)}
            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">My Files
          </motion.button>
        </div>

        <motion.div
          drag
          dragListener={false}
          whileDrag={{ scale: 1.03 }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          dragMomentum={false}
          dragControls={controls}

          initial="closed"
          variants={variants}

          animate={isOpen ? "open" : "closed"}


          id='Model' className={`w-[90vw] md:w-[80vw] mx-auto h-fit rounded-lg mt-7 ${!isOpen && 'hidden'}`}>

          {/* TOP FILE BAR */}
          <div
            onPointerDown={(e) => controls.start(e)}
            id="file"
            className='px-6 w-full rounded-md py-3 text-white flex flex-row bg-[#1E2327] hover:cursor-move'>

            <div className='items-center '>
              <h1 className='text-white text-xl font-semibold'>Files</h1>
            </div>

            <div className='ml-auto flex flex-row'>

              <div className=' bg-[#0066FD] cursor-pointer hover:bg-blue-800  space-x-2 mr-4 text-center rounded-md px-3 py-1 flex flex-row'>
                <img className='w-3 filter-white h-3 self-center fill-white' src={plusicon} alt="" />
                <p>Add</p>
              </div>

              <div className='mr-4 text-center py-1 flex flex-row cursor-pointer'>
                <img className='w-4 filter-white h-4 self-center' src={bulb} alt="" />
              </div>
              <div onClick={() => setIsOpen(false)} className='text-center py-1 flex flex-row cursor-pointer'>
                <img className='w-4 filter-white h-4 self-center' src={cross} alt="" />
              </div>
            </div>

          </div>

          {/* THE MAIN MODEL */}
          <motion.div

            initial="closed"
            variants={variants}

            animate={isOpen ? "open" : "closed"}
            className={`  ${!isOpen && 'hidden'} bg-white max-h-[80vh] overflow-y-scroll`}>

              {/* SEARCH BAR */}
            <div className='mt-5 px-5'>
              <div className="relative ">

                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none ">
                  <svg className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                    </path>
                  </svg>
                </div>

                {/* INPUT FOR SEARCH */}
                <input value={Search} onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="block p-3 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300  " placeholder="Search" />

                {/* SORT THE DATA */}
                <button onClick={sortdata} type="submit" className="text-white absolute right-[88px] bottom-1 bg-[#0066FD] hover:bg-blue-800   font-medium rounded-lg text-sm px-3 py-2 flex flex-row">
                  <img className='w-4 filter-white h-4 self-center mr-1' src={updownarrow} alt="" />
                  <p>Sort</p>
                </button>

                {/* FILTER THE DATA */}

                <button type="submit" className="text-white absolute right-1.5 bottom-1 bg-[#0066FD] hover:bg-blue-800   font-medium rounded-lg text-sm px-3 py-2 flex flex-row">
                  <img className='w-4 filter-white h-4 self-center mr-1' src={filter} alt="" />
                  <p>Filter</p>
                </button>

              </div>
            </div>

            {/* VIEW MODES */}
            <div className='flex flex-row justify-end mt-3 px-3'>
              <p className='text-sm font-semibold mr-4 text-gray-600'>View Modes :</p>
              <img className='w-4 h-4 self-center mr-3 cursor-pointer' src={layout} alt="" />
              <img className='w-4 h-4 self-center mr-3 cursor-pointer' src={rows} alt="" />
            </div>


            {
              data.filter(item => {
                if (Search === '') {
                  return item;
                } else if (item.title.toLowerCase().includes(Search.toLowerCase())) {
                  return item;
                }
              }).map(item => item.length === 0 ? (<h1>No Items to show</h1>)
                : (
                  <div className='data mt-4 px-5'>
                    <div className='pl-5 pr-3 py-2 flex flex-row justify-between bg-[#F1F4F9] rounded-lg '>

                      <div className='flex flex-row items-center relative'>
                        <p className='bg-blue-600 flex flex-col justify-center w-7 h-7 text-center text-white rounded-full text-xs'>{item.title.slice(0, 3)}</p>
                        <p className='ml-2 text-gray-800 hidden md:block'>{item.title.slice(0, 100) + '...'}</p>
                        <p className='ml-2 text-gray-800 w-[190px] sm:w-[380px] md:hidden'>{item.title.slice(0, 50) + '...'}</p>
                      </div>

                      <div className='flex flex-row items-center'>
                        <img className='w-7 h-7 self-center mr-1 filter-gray cursor-pointer' src={rightarrow} alt="" />
                        <img className='w-7 h-7 self-center filter-gray cursor-pointer' src={dots} alt="" />
                      </div>

                    </div>
                  </div>
                )

              )
            }


          </motion.div>

        </motion.div>

      </div>

    </div>
  );
}

export default App;
