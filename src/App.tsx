import { useCallback, useState } from 'react'

function App() {
  const [clickedBoxes, setClickedBoxes] = useState<number[]>([])
  const [isResetting, setIsResetting] = useState(false)

  const handleBoxClick = useCallback(
    (index: number) => {
      if (!clickedBoxes.includes(index) && !isResetting) {
        setClickedBoxes((prev) => [...prev, index])
      }
    },
    [clickedBoxes, isResetting],
  )

  const handleReset = useCallback(() => {
    setIsResetting(true)
    const resetInterval = setInterval(() => {
      setClickedBoxes((prev) => {
        const newClickedBoxes = [...prev]
        newClickedBoxes.pop()
        if (newClickedBoxes.length === 0) {
          clearInterval(resetInterval)
          setIsResetting(false)
        }
        return newClickedBoxes
      })
    }, 300)
  }, [])

  return (
    <div className='container p-4 mx-auto'>
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
        {
          [...Array(9)].map((_, ind) => (
            <div key={ind} className={`aspect-square border border-gray-200 rounded-md shadow-sm ${clickedBoxes.includes(ind) && 'bg-black'}`} onClick={()=>{
              handleBoxClick(ind)
            }}>

            </div>
          ))
        }
      </div>
      <div className='p-4 flex justify-center items-center'>
        <button disabled={!setClickedBoxes.length} onClick={handleReset} className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 disabled:cur bg-red-500 text-white hover:bg-red-800/90 cursor-pointer px-4 py-1.5 text-lg'>
          Reset
        </button>
      </div>
    </div>
  )
}

export default App
