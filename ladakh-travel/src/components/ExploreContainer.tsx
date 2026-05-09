import { useHistory } from 'react-router';
import './ExploreContainer.css';
import { useState } from 'react';
import { useEffect } from 'react';

interface ContainerProps {
  name: string;
}
const Tracking: React.FC = () => {
  const history = useHistory();
  const [selectedBus] = useState({
    number: 'JK10 AB 1234',
    type: 'Volvo Bus',
    route: 'Leh → Diskit',
  });
  useEffect(() => {
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 300);
}, []);
  
}
const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
    
  );
};


export default ExploreContainer;
