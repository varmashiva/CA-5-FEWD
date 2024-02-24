import { useEffect, useState } from 'react';
import './Books.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = (onSearch) => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    'https://reactnd-books-api.udacity.com/books',
                    { headers: { 'Authorization': 'whatever-you-want' } }
                );
                setBooks(result.data.books);
                setFilteredBooks(result.data.books);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = books.filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(filtered);
    }, [searchTerm, books]);

    return (
        <div className='main_page'>
            <div className='nav_bar'>
                <h1 className='logo'>Kalvium Books</h1>
                <input
                    className='input_box'
                    type="text"
                    placeholder="Search Books"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onSearch(searchTerm)}
                />
                <Link to={"/register"}>
                <button className='form_button'>Register</button></Link>
            </div>
            <div className="books">
                {filteredBooks.map((book, index) => (
                    <div className="book" key={index}>
                        <img className="bookCover" src={book.imageLinks.smallThumbnail} alt={book.title}/>
                        <h2 className="title">{book.title}</h2>
                        <h3 className='ratings'>Ratings: {book.averageRating} ★ Free</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Books;
