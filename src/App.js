import './App.css';
import Form from "./components/Form";
import Player from "./components/Player";
import React, { useState } from 'react';

const ROLESMAPPING = {0: "Support", 1: "Top", 2: "Mid", 3: "ADC", 4:"Jungle"};
const MAXPLAYERS = 10;
const PLAYERSPERTEAM =5;

function App(props) {
  const [players, setPlayers] = useState([]);

  function addPlayer(playerName) {

    if (players.length === MAXPLAYERS) {
      alert("there are too many players");
    }
    else if (playerAlreadyExist(playerName)) {
      alert("player already exists");
    } else {
      const newPlayer = { name: playerName, role: null, team: null};
      setPlayers([...players, newPlayer]);
    }
  }

  function removePlayer(playerName) {
    var newPlayersList = players.filter((player) => player.name !== playerName);
    setPlayers([...newPlayersList]);
  }

  function playerAlreadyExist(playerName){
    var i;
    for (i=0; i < players.length; i++) {
      if (playerName === players[i].name){
        return true;
      }
    }
    return false;
  }

  function switchTeams(playerName) {
    var newPlayersList = players.map(player =>{
      if (player.name === playerName) {
        if (player.team === "Left") {
          player.team = "Right";
        } else {
          player.team = "Left"
        }
        player.role = null;
        return player;
      } else {
        return player;
      }
    });
    setPlayers(newPlayersList);
  }

  function assignTeam(playerName, newTeam) {
    var newPlayersList = players.map(player =>{
      if (player.name === playerName) {
        player.team = newTeam;
        player.role = null;
        return player;
      } else {
        return player;
      }
    });
    setPlayers(newPlayersList);
  }

  function randomizeTeams(playerList) {

    if (playerList.length < MAXPLAYERS) {
      alert("there are not enough players");
      return;
    }

    scuffleHelper(playerList);

    if (playerList.length === 10) {
      var j;
      for (j = 0; j < PLAYERSPERTEAM; j++) {
        playerList[j].team = "Left";
      }

      for (j = PLAYERSPERTEAM; j < MAXPLAYERS; j++) {
        playerList[j].team = "Right";
      }
    }
    setPlayers([...playerList]);
  }

  function scuffleHelper(listToScuffle) {
    var m = listToScuffle.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m --);

      t = listToScuffle[m];
      listToScuffle[m] = listToScuffle[i];
      listToScuffle[i] = t;
    }
    return listToScuffle;
  }

  function randomizeRoles(leftTeam, rightTeam) {
    if (leftTeam.length !== PLAYERSPERTEAM || rightTeam.length !== PLAYERSPERTEAM){
      alert("teams need to be 5 person each");
      return;
    }

    randomizeRolesHelper(leftTeam);
    randomizeRolesHelper(rightTeam);
    setPlayers(leftTeam.concat(rightTeam));
  }

  function randomizeRolesHelper(team) {
    var roles = [...Array(PLAYERSPERTEAM).keys()];
    scuffleHelper(roles)

    var i;
    for (i=0; i < team.length; i ++) {
      team[i].role = ROLESMAPPING[roles[i]];
    }
  }

  var unassignedPlayers = players
  .filter((player) => player.team === null)
  .map(player => (
    <Player
      key={player.name}
      name={player.name}
      removePlayer={removePlayer}
      assignTeam={assignTeam}
      />
  ));

  var leftTeam = players
  .filter((player) => player.team === "Left")
  .map(player => (
    <Player
      key={player.name}
      name={player.name}
      role={player.role}
      team={player.team}
      removePlayer={removePlayer}
      switchTeams={switchTeams}
      />
  ));
  

  var rightTeam = players
  .filter((player) => player.team === "Right")
  .map(player => (
    <Player
      key={player.name}
      name={player.name}
      role={player.role}
      team={player.team}
      removePlayer={removePlayer}
      switchTeams={switchTeams}
      />
  ));

  return (
    <div className="App">

      <Form addPlayer={addPlayer}/>
    <p>Unassigned Players:</p>

    {unassignedPlayers}

    <p>Actions:</p>

    <button
      type="button"
      onClick ={() => {
        randomizeTeams(players);
      }}>
      Randomize Teams
    </button>

    <button
      type="button"
      onClick ={() => {
        randomizeRoles(players.filter((player) => player.team === "Right"), players.filter((player) => player.team === "Left"));
      }}>
      Randomize Roles 
    </button>

    <div className="teams-list">
      <div>
      <b>Team 1</b>
      <ul>{leftTeam}</ul>
      </div>
      
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <div>
      <b>Team 2</b>
      <ul>{rightTeam}</ul>
      </div>
      
    </div>

    </div>
  );
}

export default App;
