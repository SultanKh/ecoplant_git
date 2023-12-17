import { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import './TableDisplay.scss'
import { getDataEcoPlants } from "../utlis/api";
import SortArrow from "../sort-arrow/SortArrow";
export default function TableDisplay({ searchText, dateRange }) {

    const [ecoplantData, setEcoplantData] = useState([])
    const [rowLoading, setRowLoading] = useState(false)
    const [ecoPlantTotal, setEcoplantTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [sortMethod, setSortMethod] = useState('')
    const [sortAsc, setSortAsc] = useState(true)





    const LIMIT = 20
    const COLUMNS = ['TimesStamp', 'KWH', 'Pressure', 'Temp']

    useEffect(() => {
        setRowLoading(true)
        getDataEcoPlants(currentPage, LIMIT).then(results => {
            setEcoplantTotal(results.total)
            setEcoplantData(results.rows)
        })
            .catch(err => console.log('an error in calling API', err))
            .finally(() => setRowLoading(false))
    }, [])



    const paginate = ({ selected }) => {
        setCurrentPage(selected + 1);
        setRowLoading(true)
        getDataEcoPlants(selected + 1, LIMIT).then(results => {

            setEcoplantTotal(results.total)
            setEcoplantData(results.rows)
        })
            .catch(err => console.log('an error in calling API', err))
            .finally(() => setRowLoading(false))
    };




    const [startDate, endDate] = dateRange;
    let filterRowsDate = startDate && endDate ? ecoplantData.filter(item => (new Date(item.time_stamp) >= startDate) && (new Date(item.time_stamp) < endDate)) : ecoplantData


    const filteredSection = useMemo(() => {
        const regexText = new RegExp(searchText);
        return searchText ? filterRowsDate?.filter(item => regexText.test(item.time_stamp) || regexText.test(item.kwh)) : filterRowsDate
    }, [searchText, filterRowsDate])


    const sortedFilterdArray = useMemo(() => {
        const asc = sortAsc ? 1 : -1
        if (sortMethod === COLUMNS[0]) //time

            return filteredSection.sort((a, b) => asc === 1 ? a.time_stamp.localeCompare(b.time_stamp) : b.time_stamp.localeCompare(a.time_stamp))

        if (sortMethod === COLUMNS[1]) // kwh
            return filteredSection.sort((a, b) => ((+a.kwh) - (+b.kwh)) * asc)

        if (sortMethod === COLUMNS[2]) //pressure
            return filteredSection.sort((a, b) => ((+a.pressure) - (+b.pressure)) * asc)

        if (sortMethod === COLUMNS[3]) //temp
            return filteredSection.sort((a, b) => ((+a.temp) - (+b.temp)) * asc)

        return filteredSection
    }, [sortMethod, searchText, ecoplantData, sortAsc, filterRowsDate])

    const currentPosts = sortedFilterdArray


    return <div className="table-display">
        {rowLoading ? <h1>Loading</h1> :
            currentPosts && currentPosts.length > 0 ? <>
                <table>
                    <thead>
                        <tr>
                            {COLUMNS.map((column, index) => <th key={'columnName.' + index}>
                                <h2>{column}</h2>
                                <button
                                    className={column === sortMethod ? 'clicked' : ''}
                                    onClick={() => {
                                        if (sortMethod === column) {
                                            setSortAsc(state => !state)
                                        }
                                        setSortMethod(column)
                                    }}>

                                    <SortArrow asc={sortAsc && column === sortMethod} />

                                </button>
                            </th>)}
                        </tr>

                    </thead>
                    <tbody>

                        {currentPosts.map(item => <tr key={'ecoplantrow.' + item.id}>
                            <td>{item.time_stamp}</td>
                            <td>{item.kwh}</td>
                            <td>{item.pressure}</td>
                            <td>{item.temp}</td>
                        </tr>)}
                    </tbody>
                </table>
            </>
                : <h1>No Products Available</h1>

        }

        {currentPosts && currentPosts.length ? <ReactPaginate
            onPageChange={paginate}
            pageCount={Math.ceil(ecoPlantTotal)}
            previousLabel={'Prev'}
            nextLabel={'Next'}
            containerClassName={'pagination'}
            pageLinkClassName={'page-number'}
            previousLinkClassName={'page-number'}
            nextLinkClassName={'page-number'}
            activeLinkClassName={'active'}
        /> : <></>}

    </div>

}