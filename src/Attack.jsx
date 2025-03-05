import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Attack(props) {
  const { player, detectedEntities } = props;
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
    });
  };

  return (
    <>
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
      <button onClick={() => sendAttack(selectedEntity)}>Fire</button>
    </>
  );
}

Attack.propTypes = {
  player: PropTypes.number.isRequired,
  detectedEntities: PropTypes.array.isRequired,
};
