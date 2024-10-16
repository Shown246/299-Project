import { useEffect,useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import ReactPaginate from "react-paginate";

const AssignedTours = () => {

  const [bookings, setBookings] = useState([]);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5000/assignedTours",
      { withCredentials: true }
      )
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } , [refetch]);

  const handleReject = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once rejected, you will not be able to recover this booking!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willReject) => {
      if (willReject) {
        axios.patch(`http://localhost:5000/rejectBooking/${id}`,{}, { withCredentials: true })
        .then(() => {
          swal("Booking has been rejected!", {
            icon: "info",
          });
          setRefetch(!refetch);
        })
        .catch((err) => {
          console.log(err);
          swal("Failed to reject booking!", {
            icon: "error",
          });
        });
      } else {
        swal("Booking is safe!");
      }
    });
  };

  const handleAccept = (id) => {
    axios.patch(`http://localhost:5000/acceptBooking/${id}`,{}, { withCredentials: true })
    .then(() => {
      swal({
        title: "Accepted!",
        text: "Booking has been accepted!",
        icon: "success",
        button: "Okay",
      });
      setRefetch(!refetch);
    })
    .catch((err) => {
      console.log(err);
      swal({
        title: "Failed!",
        text: "Failed to accept booking!",
        icon: "error",
        button: "Close",
      });
    });
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const offset = currentPage * itemsPerPage;
  const currentItems = bookings.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(bookings.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  let count2 = offset + 1;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Package</th>
              <th>Tourist Name</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {currentItems.map((booking) => (
              <tr key={booking._id}>
                <td>{count2++}</td>
                <td>{booking.packageName}</td>
                <td>{booking.guideName}</td>
                <td>{booking.startDate.slice(0,10)}</td>
                <td>{booking.price}</td>
                <td>{booking.status}</td>
                <td>
                  <button onClick={() => {handleReject(booking._id)}}
                    className="bg-flamingo disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-red-100 hover:text-flamingo text-white font-medium py-1 px-2 rounded"
                    disabled = {booking.status !== "In Review" ? true : false}
                  >
                    Reject
                  </button>
                </td>
                <td>
                  <button onClick={() => {handleAccept(booking._id)}}
                    className="bg-genoa disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-light-green-400 text-white font-medium py-1 px-2 rounded"
                    disabled = {booking.status !== "In Review" ? true : false}
                  >
                    Accept
                  </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
      </div>
    </div>
  )
}

export default AssignedTours