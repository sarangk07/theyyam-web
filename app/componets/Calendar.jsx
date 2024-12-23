import React, { useState } from 'react';

function Calendar({ templesData, TodayDate }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  
  const months = [
    'October', 'November', 'December', 
    'January', 'February', 'March', 
    'April', 'May', 'June'
  ];

  //filter temples- based on month------------------
  const filterTemplesByMonth = () => {
    if (!selectedMonth) return templesData;

    return templesData.filter(item => {
      
      const startMonth = item.festival_start_time.split(' ')[0];
      const endMonth = item.festival_end_time.split(' ')[0];

      return startMonth === selectedMonth || endMonth === selectedMonth;
    });
  };


  const filteredTemples = filterTemplesByMonth();

  return (
    <div className='flex flex-col'>
      <div className='m-3 p-1 text-center rounded-md text-white bg-yellow-600 flex flex-wrap'>
        {months.map((month, index) => (
          <div 
            key={index} 
            className={`ml-3 cursor-pointer p-1 rounded ${selectedMonth === month ? 'bg-amber-600 text-white' : ''}`}
            onClick={() => setSelectedMonth(month)}
          >
            {month}
          </div>
        ))}
      </div>

      {selectedMonth && (
        <div className='m-3 p-2 bg-amber-100 text-center'>
          Showing Temples with Festivals in {selectedMonth}
        </div>
      )}

      <div className='flex'>
        
          <div className='flex flex-wrap'>
            {filteredTemples.length > 0 ? (
              filteredTemples.map((item, index) => (
                <div key={index} className='text-zinc-800 cursor-default my-5 bg-gradient-to-t from-yellow-200 to-yellow-600 rounded-md border-4 border-amber-200 p-5 flex flex-wrap items-center justify-center lg:flex-row mr-10 ml-5 w-56 md:w-96'>
                  <div className='mb-4 lg:mb-2 lg:mr-5'>
                    <p className='font-bold text-zinc-50'>{item.name}</p>
                    <p className='text-xs'>Place: {item.place}</p>
                    <div className='border rounded-md p-1 bg-amber-200'>
                      <h1 className='font-bold'>Festival <span className='text-xs'>[{item.malayala_masam || ''}]</span></h1>
                      <div className='text-xs flex justify-between lg:flex-col'>
                        <p>Starts: {item.festival_start_time}</p>
                        <p>Ends: {item.festival_end_time}</p>
                      </div>
                    </div>
                    
                    <p>Theyyams:</p>
                    {item.theyyams && item.theyyams.length > 0 ? (
                      <div className='flex flex-wrap'>
                        {item.theyyams.map((theyyam, index) => (
                          <p key={index} className="cursor-pointer text-xs pr-3">
                            {theyyam},
                          </p>
                        ))}
                      </div>
                    ) : (
                      <>No Datas</>
                    )}
                  </div>
                  <div>
                    <img 
                      className='max:w-40 min-w-36 md:min-w-40 rounded-sm' 
                      src={(item.img ?? item.address) || "./imgs/temple.png"} 
                      alt={item.name} 
                      width={100} 
                      height={100} 
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className='w-full text-center p-4 text-zinc-600'>
                No Festival found in {selectedMonth}
              </div>
            )}
          </div>
        
      </div>
    </div>
  );
}

export default Calendar;