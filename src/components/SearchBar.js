import React, { useState } from "react";
import { createApi } from 'unsplash-js';
import { useNavigate } from "react-router";

const SearchBar = ({ search, setSearch, setPhotos, setResult }) => {

    let navigate = useNavigate();
    const unsplash = createApi({ accessKey: 'nepucDy_yjCpJeogiY2PcNAgj47CZroqrdJL8WIFzbA' });
    const [suggestions, setSuggestions] = useState([]);


    const searchSuggestions = (e) => {
        setSearch(e.target.value);
        if (e.target.value.length > 2) {
            setTimeout(function () {
                unsplash.search
                    .getCollections({
                        query: e.target.value,
                        page: 1,
                        perPage: 10,
                    })
                    .then((result) => {
                        if (result.errors) {
                            throw new Error("No suggestions");
                        } else {
                            const photo = result.response;
                            let titles = [];
                            photo.results.map((el) => {
                                titles.push(el.title);
                            });

                            let uniqueChars = [...new Set(titles)];
                            const regex = new RegExp(`${e.target.value}`, "i");
                            let suggestions = uniqueChars.sort().filter((v) => regex.test(v));
                            setSuggestions(suggestions);
                        }
                    });
            }, 300);
        }
    };

    const renderSuggestions = (search) => {
        if (suggestions.length === 0 && search > 2) {
            return (<ul>
                <li>No results</li>
            </ul>
            );
        }
        return (
            <ul>
                {suggestions.map((el, i) => <li key={i}  onClick={(e) => searchPhotos(e, el) }>{el}</li>)}
            </ul>
        );
    }

    const searchPhotos = (e, search) => {
        e.preventDefault();
        setPhotos([]);
        unsplash.search.getPhotos({
            query: search,
            page: 1,
            perPage: 10,
        }).then(result => {
            if (result.errors) {
                setResult("There are no photorch");
                throw new Error("There are no photo");
            } else {
                const photo = result.response;
                setResult(search);
                setPhotos(photo.results);
            }
        });
        setSuggestions([]);
        setSearch(search);
        navigate("/photo");
    }


    return (
        <form onSubmit={(e) => searchPhotos(e, search)}>
            <div>
                <i className="fas fa-search"></i>
                <input className="search__bar" type="text" placeholder="Search free high-resolution photos"
                    value={search} onChange={searchSuggestions} />
                {renderSuggestions(search)}
            </div>
        </form>
    );
}
    ;

export default SearchBar;
