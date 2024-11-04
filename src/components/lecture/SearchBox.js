import React , { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({  
        onSearch, 
        initialValues = { mainCode: '', subCode: '', searchWrd: '' },  
    }) => {
    const [mainCode, setMainCode] = useState(initialValues.mainCode);
    const [subCode, setSubCode] = useState(initialValues.subCode);
    const [searchWrd, setSearchWrd] = useState(initialValues.searchWrd);

    const handleSearchClick = () => {
        onSearch({ mainCode, subCode, searchWrd });
        
    };

    const handleReset = () => {
        setMainCode('');
        setSubCode('');
        setSearchWrd('');
        onSearch({ mainCode: '', subCode: '', searchWrd: '' });
    };
    
    const handleSelectChange = (e) => {
        const { name, value } = e.target;

        if (name === 'mainCode') {
            setMainCode(value);
            onSearch({ mainCode: value, subCode, searchWrd });
        } else if (name === 'subCode') {
            setSubCode(value);
            onSearch({ mainCode, subCode: value, searchWrd });
        }
    };

    return (
        <div className="input-box">
            <div className="input-box-inner">
                <div className="fom-inp">
                    <select
                        name="mainCode"
                        className="inp-sel"
                        value={mainCode}
                        onChange={handleSelectChange}
                    >
                        <option value="">전체</option>
                        <option value="A001">관리감독자</option>
                        <option value="A002">근로자</option>
                        <option value="A003">위험성평가자</option>
                    </select>
                </div>
                <div className="fom-item">
                    <select
                        name="subCode"
                        className="inp-sel"
                        value={subCode}
                        onChange={handleSelectChange}
                    >
                        <option value="">전체</option>
                        <option value="s001">제조업</option>
                        <option value="s002">건설업</option>
                        <option value="s003">서비스업</option>
                    </select>
                </div>
                <div className="fom-inp">
                    <input
                        className="inp-sel2"
                        type="text"
                        placeholder="교육과정명을 검색하세요."
                        value={searchWrd}
                        onChange={(e) => setSearchWrd(e.target.value)}
                    />
                    <button
                        type="button"
                        className="form-icon btn_seach"
                        onClick={handleSearchClick}
                    ></button>
                </div>
            </div>
            <span>
                <button className="btn_reset" onClick={handleReset}>
                    초기화
                </button>
            </span>
        </div>
    );
};

SearchBox.propTypes = {
    onSearch: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
        mainCode: PropTypes.string,
        subCode: PropTypes.string,
        searchWrd: PropTypes.string,
    }),
};


export default SearchBox;
