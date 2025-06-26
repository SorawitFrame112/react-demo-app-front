import { useState, useEffect } from 'react';
import { TextField, Stack } from '@mui/material';
import CollapsibleTable from '../../../share/TableCustom';
import CurrencyService from '../../../../services/currencyServices';
import MasterPageLayout from '../../../layout/MasterPageLayout';
import ModalCustom from '../../../share/ModalCustom'; // import modal component
import CurrencyForm from '../../../form/master/currency/currencyForm'
const headers = [
  { key: 'idx', label: 'Id', align: 'right' },
  { key: 'currencyCode', label: 'Currency Code', align: 'center' },
  { key: 'currencyName', label: 'Currency Name', align: 'center' },
];

function SetupCurrency() {
  const [data, setData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CurrencyService.getCurrentcies();
        setData(response);
      } catch (error) {
        console.error('Failed to fetch currencies:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (row) => {
    var dataEdit = {
      idx: row.idx,
      currencyName: row.currencyName,
      currencyCode: row.currencyCode
    }
    setEditData(dataEdit);
    setOpenModal(true);
  };

  const handleSave = () => {
    // TODO: call update API here
    console.log('Saving:', editData);
    setOpenModal(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <MasterPageLayout
        title="Currency"
        content={
          <>
            <CollapsibleTable
              headers={headers}
              data={data}
              onEdit={handleEdit}
              onDelete={(row) => console.log('Delete clicked:', row)}
            />

            <ModalCustom
              open={openModal}
              onClose={() => setOpenModal(false)}
              title="Edit Currency"
              onSubmit={handleSave}
              formContent={
                editData
                  ? <CurrencyForm mode="edit" defaultValues={editData} />
                  : <CurrencyForm mode="add" defaultValues={null} />
              }
            />

          </>
        }
      />
    </div>
  );
}

export default SetupCurrency;
