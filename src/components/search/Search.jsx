import React from 'react';
import search from '../../assets/search.svg'
import s from './search.module.scss'

const Search = ({ searchValue, setSearchValue }) => {

	return (
		<div className={s.root}>
			<form>
				<img className={s.icon} src={search} alt="search" />
				<input
					className={s.input}
					type="text"
					placeholder='Поиск'
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
				/>
			</form>
		</div>
	)
}

export default Search