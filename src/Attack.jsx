import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import boom from './assets/boom.mp3';

export default function Attack(props) {
  const { player, detectedEntities } = props;
  const audioRef = useRef(null);
  const [selectedEntity, setSelectedEntity] = useState(0);

  useEffect(() => {
    if (detectedEntities.length > 0) {
      setSelectedEntity(`${detectedEntities[0].player},${detectedEntities[0].type}`);
    }
  }, [detectedEntities]);

  const handleSelectionChange = (event) => {
    setSelectedEntity(event.target.value);
  };

  const sendAttack = (target) => {
    if (target === 0) {
      return;
    }

    let [targetPlayer, targetType] = target.split(',');
    
    fetch(`http${import.meta.env.VITE_MIDDLEWARE_URI}/attack`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player: player,
        target: targetPlayer,
        type: targetType
      }),
    }).then((response) => {
      if (response.ok) {
        if (audioRef.current) {
          audioRef.current.play();
        }
      }
    }
    ).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="attack-interface">
      <h3>Initiate Attack</h3>
      <select value={selectedEntity} onChange={handleSelectionChange}>
        <option disabled value={0}>
          Select an entity
        </option>
        {detectedEntities.map((entity, index) => (
          <option key={index} value={`${entity.player},${entity.type}`}>
            Player {entity.player} {entity.type.charAt(0).toUpperCase() + entity.type.slice(1)} - {entity.tile}
          </option>
        ))}
      </select>
      <audio src={boom} ref={audioRef} />
      <button className='attack-button' onClick={() => sendAttack(selectedEntity)}>FIRE!</button>
    </div>
  );
}

Attack.propTypes = {
  player: PropTypes.number.isRequired,
  detectedEntities: PropTypes.array.isRequired,
};
