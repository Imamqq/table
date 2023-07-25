import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import group from '../../assets/Group.svg';
import s from './posts.module.scss';
import { fetchPosts, getPosts, isLoading } from '../../redux/ApiSlice';

const Posts = ({ searchValue }) => {
	const items = useSelector(getPosts);
	const loading = useSelector(isLoading);
	const dispatch = useDispatch();

	const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 10;

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	const handleSort = (key) => {
		let direction = 'asc';
		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}
		setSortConfig({ key, direction });
	};

	const sortedItems = [...items].sort((a, b) => {
		if (a[sortConfig.key] === b[sortConfig.key]) return 0;

		if (sortConfig.direction === 'asc') {
			if (sortConfig.key === 'title') {
				return a[sortConfig.key].localeCompare(b[sortConfig.key]);
			} else if (sortConfig.key === 'body') {
				const wordsInBodyA = a[sortConfig.key].trim().split(/\s+/).length;
				const wordsInBodyB = b[sortConfig.key].trim().split(/\s+/).length;
				return wordsInBodyA - wordsInBodyB;
			} else {
				return a[sortConfig.key] - b[sortConfig.key];
			}
		} else {
			if (sortConfig.key === 'title') {
				return b[sortConfig.key].localeCompare(a[sortConfig.key]);
			} else if (sortConfig.key === 'body') {
				const wordsInBodyA = a[sortConfig.key].trim().split(/\s+/).length;
				const wordsInBodyB = b[sortConfig.key].trim().split(/\s+/).length;
				return wordsInBodyB - wordsInBodyA;
			} else {
				return b[sortConfig.key] - a[sortConfig.key];
			}
		}
	});


	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = sortedItems.slice(indexOfFirstPost, indexOfLastPost);

	const paginateNext = () => setCurrentPage((prevPage) => prevPage + 1);
	const paginatePrev = () => setCurrentPage((prevPage) => prevPage - 1);
	const paginateToPage = (pageNumber) => setCurrentPage(pageNumber);

	const totalPosts = sortedItems.length;
	const totalPages = Math.ceil(totalPosts / postsPerPage);


	const getPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i);
		}
		return pageNumbers;
	};
	return (
		<div className={s.container}>
			{loading ? (
				<div className={s.loading}>Загрузка</div>
			) : (
				<div>
					<table className={s.table}>
						<thead>
							<tr>
								<th className={s.first} onClick={() => handleSort('id')}>
									ID <img src={group} alt="group" />
								</th>
								<th className={s.second} onClick={() => handleSort('title')}>
									Заголовок <img src={group} alt="group" />
								</th>
								<th className={s.third} onClick={() => handleSort('body')}>
									Описание <img src={group} alt="group" />
								</th>
							</tr>
						</thead>
						<tbody>
							{currentPosts
								.filter((obj) => {
									if (
										obj.title.toLowerCase().includes(searchValue.toLowerCase()) ||
										obj.body.toLowerCase().includes(searchValue.toLowerCase())
									) {
										return true;
									}
									return false;
								})
								.map((obj) => (
									<tr key={obj.id} className={s.posts}>
										<td className={s.id}>{obj.id}</td>
										<td className={s.title}>{obj.title}</td>
										<td className={s.body}>{obj.body}</td>
									</tr>
								))}
						</tbody>
					</table>
					<div className={s.pagination}>
						<button className={s.tuda_suda} onClick={paginatePrev} disabled={currentPage === 1}>
							Назад
						</button>
						<div className={s.pages}>
							{getPageNumbers().map((number) => (
								<button
									key={number}
									onClick={() => paginateToPage(number)}
									className={currentPage === number ? s.active : ''}
								>
									{number}
								</button>
							))}
						</div>
						<button className={s.tuda_suda} onClick={paginateNext} disabled={indexOfLastPost >= totalPosts}>
							Далее
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Posts;
