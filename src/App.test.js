import React from 'react';
import ReactDOM from 'react-dom';
import Messages from './components/Messages';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Messages />, div);
  ReactDOM.unmountComponentAtNode(div);
});
