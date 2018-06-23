/**
 * Created by anirudh.r on 08/07/17.
 */
import React, {Component} from 'react';
import BookShelf from './BookShelf.js';
import {Link} from 'react-router-dom';

export default class BookShelfList extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-content">
                    <div>
                        <BookShelf shelfTitle='Currently Reading' bookList={this.props.currentlyReading}
                                   onShelfChange={this.props.onShelfChange}/>
                        <BookShelf shelfTitle='Want to Read' bookList={this.props.wantToRead}
                                   onShelfChange={this.props.onShelfChange}/>
                        <BookShelf shelfTitle='Read' bookList={this.props.read}
                                   onShelfChange={this.props.onShelfChange}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}
