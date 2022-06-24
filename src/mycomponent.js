// mycomponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const MyComponent = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get('https://api.hatchways.io/assessment/students');
                setData(response.students);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    console.log(data)
    // const studentData = data && data.students;
    // console.log("Student data: " + studentData)

    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        console.log(value);
        result = data.filter((data) => { return data.FirstName.search(value) !== -1; });
        setFilteredData(result);
    }
    const [filteredData, setFilteredData] = useState(data);
    console.log(filteredData);

    let sum = data.reduce((a, b) => a + b, 0);	//get sum of all elements in array
    let average = (sum / data.length) || 0; //get average of all elements in array ;)

    const [datas, setDatas] = useState([]);
    const [dataa, setDataa] = useState('');

    const addTagHandler = () => {
        setDatas([...datas, dataa]);
        setDataa('');

        console.log("Clicked tag");
        console.log(dataa);
        console.log(datas);
    }

    const handleChange = e => {
        setDataa(e.target.value);
    };

    // const handleKeypress = e => {
    //     //it triggers by pressing the enter key
    //     if (e.keyCode === 13) {
    //         addTagHandler();
    //     }
    // };

    return (
        <div>
            {loading && <div>Loading</div>}
            {!loading && (
                <div>
                    <h2 className='title'>Frontend Assessment - Student Profiles</h2>
                    <div>
                        <input className='student-search' type="text" onChange={handleSearch} placeholder="Search by name" />
                        {/* <p>{filteredData}</p> */}
                        {/* {filteredData.map(student => (
                            <p>{student}</p>
                        ))} */}
                    </div>
                    <div>
                        <input className='student-search' type="text" onChange={handleSearch} placeholder="Search by tag" />
                        {/* <p>{filteredData}</p> */}
                    </div>
                    <ul className='student-list'>
                        {data?.map((student, index) => (
                            <div className="student-items" key={`student-${index + 1}`}>
                                <div className="student-div">
                                    <div>
                                        <img className='student-pic' src={student.pic} alt={`Pic for Student ${index + 1}`} />
                                    </div>
                                    <div className='student-data'>
                                        <li><h1>{student.firstName}&nbsp;{student.lastName}</h1></li> <span></span>
                                        <div className='student-info'>
                                            <li><strong>Email: </strong> {student.email}</li>
                                            <li><strong>Company: </strong> {student.company}</li>
                                            <li><strong>Skill: </strong> {student.skill}</li>
                                            <li><strong>Average: </strong> {average}</li>

                                            {datas.map(dataa => (
                                                <span className='student-tag-item'>{dataa}</span>
                                            ))}

                                            <div class="collapse hide" id="myCollapse">
                                                <ol>
                                                    {student.grades.map((grade, index) => (
                                                        <li key={`grade-${index + 1}`}>
                                                            Test:
                                                            &nbsp; {grade}%
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                            <div className='student-grades'>
                                                <input type="text" onChange={handleChange} onClick={addTagHandler} placeholder="Add a tag" className='student-tag' />
                                                {/* <input type="text" value={value} onChange={handleChange} onKeyPress={handleKeypress} onClick={handleSubmit} placeholder="Add a tag" className='student-tag' /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='button-col'>
                                    <button type="button" class="btn btn-secondary ms-5 my-5 " data-bs-toggle="collapse" data-bs-target="#myCollapse">+</button>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div >
            )}
        </div >
    )
}

export default MyComponent;