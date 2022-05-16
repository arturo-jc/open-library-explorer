import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import Book from './Book';

const testBookRoute = () => {
    const history = createMemoryHistory({ initialEntries: ['/books?olid=OL6504102M&workid=OL64468W'] });
    render(
        <Router history={history}>
            <Route path='/books'>
                <Book />
            </Route>
        </Router>
    );
}

describe('Book page', () => {
    test('Renders book details if request succeeds', async () => {

        axios.get = jest.fn();
        axios.get.mockResolvedValueOnce({
            data: {
                'OLID:OL6504102M': {
                    title: "Brave new world",
                    authors: [{ name: 'Aldous Huxley' }],
                    cover: {
                        large: 'https://covers.openlibrary.org/b/id/8231823-L.jpg'
                    },
                    subjects: [
                        { name: "Utopias", url: "https://openlibrary.org/subjects/utopia" },
                        { name: "Brainwashing", url: "https://openlibrary.org/subjects/brainwashing" }
                    ],
                    url: "https://openlibrary.org/books/OL6504102M/Brave_new_world"
                }
            }
        });
        axios.get.mockResolvedValueOnce({
            data: {
                description: "Originally published in 1932, this outstanding work of literature is more crucial and relevant today than ever before. Cloning, feel-good drugs, antiaging programs, and total social control through politics, programming, and media -- has Aldous Huxley accurately predicted our future? With a storyteller's genius, he weaves these ethical controversies in a compelling narrative that dawns in the year 632 AF (After Ford, the deity). When Lenina and Bernard visit a savage reservation, we experience how Utopia can destroy humanity. A powerful work of speculative fiction that has enthralled and terrified readers for generations, Brave New World is both a warning to be heeded and thought-provoking yet satisfying entertainment. - Container."
            }
        });

        testBookRoute();
        const cover = await screen.findByAltText('cover', { exact: false });
        const description = await screen.findByText("Originally published in 1932", { exact: false });
        const subjects = await screen.findAllByRole('listitem');
        expect(cover).toBeVisible();
        expect(description).toBeVisible();
        expect(subjects).not.toHaveLength(0);
    });

    test('Displays not found msg if request fails', async () => {
        axios.get = jest.fn();
        axios.get.mockRejectedValue(new Error('Async error'));

        testBookRoute();

        const errorMsg = await screen.findByText('Could not find the book you requested. Sorry!', { exact: false });
        expect(errorMsg).toBeVisible();
    });
});

