import { Route, Routes } from 'react-router-dom'
import NewBooking from '../pages/NewBooking'
import ApartmentDet from '../pages/ApartmentDet'
import EditApartment from '../pages/EditApartment'
import HomePage from '../pages/HomePage'
import ErrorPage from '../pages/ErrorPage'
import AboutPage from '../pages/AboutPage'
import AddApt from '../pages/AddApt'
import SignUpPage from '../pages/SignUpPage'
import LogInPage from '../pages/LogInPage'
import IsPrivate from '../components/IsPrivate'
import IsAnon from '../components/IsAnon'
import UserPage from '../pages/UserPage'

const AppRouter = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/newbooking" element={<IsPrivate><NewBooking/></IsPrivate>}></Route>
        <Route path="/newapartment" element={<IsPrivate><AddApt/></IsPrivate>}></Route>
        <Route path="/apartment/:id" element={<IsPrivate><ApartmentDet/></IsPrivate>}></Route>
        <Route path="/apartment/:id/edit" element={<IsPrivate><EditApartment/></IsPrivate>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="/signup" element={<IsAnon><SignUpPage /></IsAnon>}></Route>
        <Route path="/login" element={<IsAnon><LogInPage /></IsAnon>}></Route>
        <Route path="/profile" element={<IsPrivate><UserPage /></IsPrivate>}></Route>
        <Route path="/*" element={<ErrorPage/>}></Route>
    </Routes>
    </>
  )
}

export default AppRouter