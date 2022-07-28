// mycomponent.js
import React, { useEffect, useState } from 'react';
import { Student } from './student';
import axios from 'axios';

const MyComponent = () => {
    const [loading, setLoading] = useState(false);
    const [dataDisplay, setDataDisplay] = useState([]); //data from API
    const [allTags, setAllTags] = useState([]);
    const [studentData, setStudentData] = useState([])
    const [studentSearch, setStudentSearch] = useState('')
    const [studentTagSearch, setStudentTagSearch] = useState('')



    // Fethcing data from the API
    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: response } = await axios.get(
                'https://api.hatchways.io/assessment/students'
            );
            addTags(response.students);
            setDataDisplay(response.students);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
    };

    const addTags = (students) => {
        const studentsWithTags = []
        students.forEach((student) => {
            Object.assign(student, { tags: [] })
            studentsWithTags.push(student)
        })
        setStudentData(studentsWithTags)
    }

    const addTag = (tagInput, STUDENTID) => {
        const newStudentData = [...studentData]
        newStudentData.forEach((student) => {
            if (student.id === STUDENTID) {
                student.tags.push(tagInput)
                setDataDisplay(newStudentData)
            }
        }
        )
    }



    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let filteredStudents = studentData.filter((student) => {
            let flag = false
            student.tags.forEach((tag) => {
                if (tag.toLowerCase().includes(studentTagSearch.toLowerCase().trim())) {
                    flag = true
                }
            })
            return flag
        })
        if (studentTagSearch === '') {
            filteredStudents = studentData
        }
        filteredStudents = filteredStudents.filter((student) => student.firstName.concat(student.lastName).toLowerCase().includes(studentSearch.toLowerCase().trim()))
        // set state to students which pass the search filters
        setDataDisplay(filteredStudents)
    }, [studentTagSearch, studentSearch, studentData])

    return (
        <div>
            {loading && <div>Loading</div>}
            {!loading && (
                <div>
                    <h2 className='title'>Front-End Assessment - Student Profiles</h2>

                    {/* rendering student filter search by name */}
                    <div>
                        <input
                            className='student-search'
                            type='search'
                            value={studentSearch}
                            onChange={(e) => setStudentSearch(e.target.value)}
                            placeholder='Search by name'
                        />
                    </div>

                    {/* rendering student search by tag name */}
                    <div>
                        <input
                            className='student-search'
                            type='search'
                            value={studentTagSearch}
                            onChange={(e) => setStudentTagSearch(e.target.value)}
                            // onChange={handleSearchTags}
                            placeholder='Search by tag'
                        />
                    </div>

                    {/* redering data from API  */}
                    <ul className='student-list'>
                        {dataDisplay &&
                            dataDisplay.map((student) => (
                                <Student
                                    key={student.id}
                                    {...student}
                                    addTag={addTag}
                                />
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MyComponent;