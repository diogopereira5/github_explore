import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from "react-router-dom"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

import api from "../../services/api";
import { Header, RepositoryInfor, Issues } from './style';

function Repositories() {

  const [repository, setRepository] = useState(null);
  const [issues, setIssues] = useState([]);

  const { params } = useRouteMatch();

  useEffect(() => {

    api.get(`repos/${params.repository}`).then(res => {
      setRepository(res.data)
    });

    api.get(`repos/${params.repository}/issues`).then(res => {
      setIssues(res.data)
    });

  }, [params.repository])

  return (
    <>
      <Header>
        <img src={URL = "https://xesque.rocketseat.dev/platform/1587379765556-attachment.svg"} alt="Github" />
        <Link to="/" >
          <FiChevronLeft size={16} />
        Voltar
      </Link>
      </Header>

      {
        repository && (
          <RepositoryInfor>
            <header>
              <img src={repository.owner.avatar_url} alt={repository.owner.login} />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
            </header>
            <ul>
              <li>
                <strong>{repository.stargazers_count}</strong>
                <span>Stars</span>
              </li>
              <li>
                <strong>{repository.forks_count}</strong>
                <span>Furks</span>
              </li>
              <li>
                <strong>{repository.open_issues_count}</strong>
                <span>Issues Abertas</span>
              </li>
            </ul>
          </RepositoryInfor>
        )
      }

      <Issues>
        {issues.map(issue => (
          <a href={issue.html_url} target="_blank">
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
}

export default Repositories;