import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IAPIGameDetails, IAPIGameScore } from '../../util/types/APITypes';
import './DataTable.scss';
import { getCorsiForPercent, getPDO } from '../../util/AnalyticsUtils';

interface IDataTableProps {
    gameDetails: IAPIGameDetails
    gameData: IAPIGameScore
}

const DataTable = (props : IDataTableProps) => {

    const getRowData = (homeTeam: boolean) => {
        const corsi = getCorsiForPercent(props.gameDetails);
        const pdo = getPDO(props.gameDetails);
        return {
            name : homeTeam ? props.gameData.homeTeamName : props.gameData.awayTeamName ,
            shots : homeTeam ? props.gameDetails.homeStats.shots : props.gameDetails.awayStats.shots ,
            corsi : homeTeam ? corsi.home : corsi.away ,
            pdo : homeTeam ? pdo.home : pdo.away
        }
    }

    const rows = [
        getRowData(true),
        getRowData(false)
    ];

    return (
    <div className="table-div">
    <h5>Advanced Stats</h5>  
    <TableContainer component={Paper}>
      {/* <Table sx={{ minWidth: 650 }} aria-label="simple table"> */}
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Team</TableCell>
            <TableCell align="center">Shots</TableCell>
            <TableCell align="center">Corsi</TableCell>
            <TableCell align="center">PDO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.shots}</TableCell>
              <TableCell align="center">{row.corsi}</TableCell>
              <TableCell align="center">{row.pdo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    )
}

export default DataTable