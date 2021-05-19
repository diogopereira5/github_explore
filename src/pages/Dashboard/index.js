import React, { useState, useEffect } from 'react';
import { FiChevronRight } from "react-icons/fi"
import { Link } from "react-router-dom"

import api from "../../services/api"
import { Title, Form, Repositories, Error } from "./style";

function Dashboard() {

    const [newRepo, setNewRepo] = useState("")
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState(() => {
        const storageRepositories = localStorage.getItem("@GithubExplore:repositories");

        if (storageRepositories) {
            return JSON.parse(storageRepositories);
        } else {
            return []
        }

    });

    useEffect(() => {
        localStorage.setItem("@GithubExplore:repositories", JSON.stringify(repositories))
    }, [repositories])

    async function handleAddRepository(event) {

        event.preventDefault();

        if (!newRepo) {
            setInputError("Digite o autor/nome do repositório")
            return;
        }

        try {
            const response = await api.get(`repos/${newRepo}`);

            const repository = {
                id: response.data.id,
                full_name: response.data.full_name,
                description: response.data.description,
                owner: {
                    login: response.data.owner.login,
                    avatar_url: response.data.owner.avatar_url,
                },
            };

            setRepositories([...repositories, repository]);
            setNewRepo("")
            setInputError("")
        } catch (err) {
            setInputError("Erro na busca por esse repositório")
        }

    }

    return (
        <>
            <img src={URL = "https://xesque.rocketseat.dev/platform/1587379765556-attachment.svg"} alt="Github" />
            <Title>Explore repositórios no GitHub</Title>

            <Form
                onSubmit={(e) => handleAddRepository(e)}
                hasError={!!inputError}
            >
                <input
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {
                    repositories.map(repo => (
                        <Link to={`/repos/${repo.full_name}`}>
                            <img
                                src={repo.owner.avatar_url}
                                alt={repo.owner.login}
                            />
                            <div>
                                <strong>{repo.full_name}</strong>
                                <p>{repo.description}</p>
                            </div>
                            <FiChevronRight size={20} />
                        </Link>
                    ))
                }
            </Repositories>
        </>
    )
}

export default Dashboard;