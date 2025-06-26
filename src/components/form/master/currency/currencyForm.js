import { Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { TextFieldElement } from 'react-hook-form-mui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { currencyRequestSchema } from '../../../../models/master/currencyRequestDto';

function CurrencyForm({ mode = 'add', defaultValues = {} }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(currencyRequestSchema),
    defaultValues: {
      idx: 0,
      currencyCode: '',
      currencyName: '',
      ...defaultValues, // เติมค่าเริ่มต้นที่รับเข้ามา
    },
  });

  // ถ้าค่า defaultValues เปลี่ยน ให้รีเซ็ตฟอร์มด้วย
  useEffect(() => {
    reset({
      idx: 0,
      currencyCode: '',
      currencyName: '',
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  const submitHandler = async (data) => {

        console.log('Form data submitted:', data);
   
  };

  return (
    <Stack
      sx={{
        minHeight: '100vh',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f0f2f5',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          minWidth: 300,
          maxWidth: 400,
          padding: 2,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
              {mode === 'edit' ? 'Edit Currency' : 'Create Currency'}
            </Typography>

            <TextFieldElement
              control={control}
              label="Currency Code"
              name="currencyCode"
              helperText={errors.currencyCode ? errors.currencyCode.message : ''}
              fullWidth
            />
            <TextFieldElement
              control={control}
              label="Currency Name"
              name="currencyName"
              helperText={errors.currencyName ? errors.currencyName.message : ''}
              margin="normal"
              fullWidth
            />

            <Stack sx={{ mt: 3, alignItems: 'center' }}>
              <Button variant="contained" type="submit">
                {mode === 'edit' ? 'บันทึกการแก้ไข' : 'บันทึก'}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default CurrencyForm;
