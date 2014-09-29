/*jslint browser: true*/

require(['react', 'jsx!components/react/Characterlist'], function (React, CharacterList) {
  'use strict';

  React.renderComponent(
    CharacterList({ url: '/character/getlist', pollInterval: 2000 }),
    document.getElementById('characterListContainer')
  );

});



