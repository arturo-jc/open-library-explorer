import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import Subject from './Subject';

const testSubjectRoute = () => {
    const history = createMemoryHistory({ initialEntries: ['/subjects/science/1'] });
    render(
        <Router history={history}>
            <Route path='/subjects/:subject/:page'>
                <Subject />
            </Route>
        </Router>
    );
}

describe('Subject page', () => {
    test('Renders books if request succeeds', async () => {

        axios.get = jest.fn();
        axios.get.mockResolvedValueOnce({
            data: {
                work_count: 70814,
                works: [
                    {
                        authors: [{ key: "/authors/OL19767A", name: "Aldous Huxley" }],
                        cover_edition_key: 'OL6504102M',
                        cover_id: 8231823,
                        key: '/works/OL64468W',
                        lending_edition: 'OL28390491M',
                        title: 'Brave New World'
                    },
                    {
                        authors: [{ key: "/authors/OL164746A", name: "Titus Lucretius Carus" }],
                        cover_edition_key: "OL7870148M",
                        cover_id: 566208,
                        key: '/works/OL1548597W',
                        lending_edition: "OL21412065M",
                        title: "On the Nature of the Universe"
                    }
                ]
            }
        });

        testSubjectRoute();

        const bookCovers = await screen.findAllByAltText('cover', { exact: false });
        expect(bookCovers).not.toHaveLength(0);
    });

    test('Displays not found msg if request fails', async () => {
        axios.get = jest.fn();
        axios.get.mockRejectedValue(new Error('Async error'));

        testSubjectRoute();

        const errorMsg = await screen.findByText('Could not find any books on that subject. Sorry!', { exact: false });
        expect(errorMsg).toBeVisible();
    });
});

