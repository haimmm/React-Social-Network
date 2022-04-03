import TweetsContext from "context/TweetsContext";
import { useValue } from "hooks/useValue";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Searchbar.css"

const Searchbar = () => {
    const [inputValue, handleInputChange, clear] = useValue();
    const [selectValue, handleSelectChange] = useValue("userId");
    const { search } = useContext(TweetsContext);

    const handleSearch = () =>{
        search(selectValue, inputValue);
        clear();
    }


    return (
        <div className="search">
            <select value={selectValue} onChange={handleSelectChange}>
                <option value="userId">Search by user</option>
                <option value="content">Search by content</option>
            </select>
            <input type="search" value={inputValue} onChange={handleInputChange}></input>
            <NavLink to="/home"><button onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i></button></NavLink>
        </div>
    );   
}

export default Searchbar;