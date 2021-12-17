import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Ownership from './components/Ownership/Ownership';
import Loading from './components/Loading/Loading';
import PlanetCard from './components/Card/PlanetCard';


describe('Jest is working', () => {
  test('check if test runner is working properly', () => {
    expect(1).toBe(1);
  });
});

describe('App component', () => {
  test('renders my personal website link', () => {
    render(
        <Ownership />
    );
    expect(screen.getByText(/Vesela Videva/i)).toBeInTheDocument();
  });

  test('renders my Loading component', () => {
    render(
        <Loading />
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});

describe('PlanetCard component', () => {
  let planet = {
    name: 'Earth',
    image: 'https://images-assets.nasa.gov/image/0202795/0202795~orig.jpg'
  }

  test('should display planet name', () => {
    const history = createMemoryHistory();
    render(
        <Router history={ history }>
          <PlanetCard planet={ planet }/>
        </Router>
    )
    expect(document.querySelector('h2').textContent).toBe('Earth');
  });

  test('should display planet image and alt name', () => {
    const history = createMemoryHistory();
    render(
        <Router history={ history }>
          <PlanetCard planet={ planet }/>
        </Router>
    )
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://images-assets.nasa.gov/image/0202795/0202795~orig.jpg');
    expect(image).toHaveAttribute('alt', 'Earth');
  });

  test('should display button to Details page', () => {
    const history = createMemoryHistory();
    render(
        <Router history={ history }>
          <PlanetCard planet={ planet }/>
        </Router>
    )
    expect(document.querySelector('.button-text').textContent).toBe('Details');
  });
});