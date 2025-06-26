import React, { useState } from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function CollapsibleRow({ row, headers, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          {row.children && (
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        {headers.map((header) => (
          <TableCell key={header.key} align={header.align || 'left'}>
            {row[header.key]}
          </TableCell>
        ))}
        <TableCell>
          {onEdit && (
            <IconButton onClick={() => onEdit(row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          )}
          {onDelete && (
            <IconButton onClick={() => onDelete(row)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      {row.children && (
        <TableRow>
          <TableCell colSpan={headers.length + 2} sx={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Details
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {Object.keys(row.children[0] || {}).map((key) => (
                        <TableCell key={key}>{key}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.children.map((child, idx) => (
                      <TableRow key={idx}>
                        {Object.keys(child).map((key) => (
                          <TableCell key={key}>{child[key]}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default function CollapsibleTable({ headers, data, onEdit, onDelete }) {
  const isEmpty = !data || data.length === 0;

  return (
    <TableContainer component={Paper}>
      <Table size='medium'>
        <TableHead>
          <TableRow>
            <TableCell />
            {headers.map((header) => (
              <TableCell key={header.key} align={header.align || 'left'}>
                {header.label}
              </TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isEmpty ? (
            <TableRow>
              <TableCell colSpan={headers.length + 2} align="center">
                No Data
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, idx) => (
              <CollapsibleRow
                key={idx}
                row={row}
                headers={headers}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

