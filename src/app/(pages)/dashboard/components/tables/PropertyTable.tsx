import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Property } from "@prisma/client";

interface PropertyTableProps {
  properties: Property[];
}

const PropertyTable = ({ properties }: PropertyTableProps) => {
  return (
    <div>
      <Table>
        <TableCaption>Lista com suas propriedades</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Localização</TableHead>
            <TableHead>Preço/dia</TableHead>
            <TableHead>N° de Banheiros</TableHead>
            <TableHead>N° de Quartos</TableHead>
            <TableHead>Tipo de Propriedade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>{property.title}</TableCell>
              <TableCell>{property.location}</TableCell>
              <TableCell>{Number(property.pricePerNight)}</TableCell>
              <TableCell>{property.numBathrooms}</TableCell>
              <TableCell>{property.numBedrooms}</TableCell>
              <TableCell>{property.propertyType}</TableCell>
              <TableCell>{property.status}</TableCell>
              <TableCell>Editar | Excluir</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PropertyTable;
