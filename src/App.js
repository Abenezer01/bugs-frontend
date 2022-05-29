import logo from './logo.svg';
// import './App.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loadBugs,resolveBug } from './store/bugSlice';
import { map } from 'lodash'
import AddBug from './components/addbug'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadBugs())
  }, [])
  const bugs = useSelector((state) => state.bugs)
  useEffect(() => {
    console.log('bugs', bugs)
  }, [bugs])
  const [isBugAdd, setIsBugAdd] = useState(false)
  const toggleAddBug = () => {
    console.log('is working')
    setIsBugAdd(!isBugAdd)
  }
  return (
    <div className="App m-5">
      <button className='btn btn-sm btn-primary mb-2' onClick={toggleAddBug}>
        {isBugAdd ? 'Cancel' : 'Add'}
      </button>
      {!isBugAdd ?
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Resolved</th>
              <th>Resolve by</th>
            </tr>
          </thead>
          <tbody>
            {map(bugs.list, (bug, i) => (
              <tr>
                <td>
                  {bug.name}
                </td>
                <td>
                  {bug.description}
                </td>
                <td>
                  {bug.resolved?'true':
                  <button onClick={()=>{dispatch(resolveBug(bug.id))}}>Resolve</button>}
                </td>
                <td>
                  {bug.userId}
                </td>
              </tr>
            ))}
          </tbody>
        </table> :
        <AddBug toggleAddBug={toggleAddBug}/>
      }
    </div>
  );
}

export default App;
