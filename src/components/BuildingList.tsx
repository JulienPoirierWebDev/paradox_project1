import TemplateBuilding from "@thetinyspark/paradox/dist/core/model/schema/building/TemplateBuilding"

export default function BuildingList({buildings}: {buildings:TemplateBuilding[] }) {
    
  return (
    <div>{buildings.map((building) => {
        return <p key={building.id}>{building.name}</p>
    })}</div>
  )
}
