using Microsoft.EntityFrameworkCore.Migrations;

namespace vojaro.api.Migrations
{
    public partial class AlterAsignaturas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "AsignaturaId",
                table: "correlativas",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddPrimaryKey(
                name: "PK_asignaturas_correlativas",
                table: "asignaturas_correlativas",
                columns: new[] { "AsignaturaId", "CorrelativaId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_asignaturas_correlativas",
                table: "asignaturas_correlativas");

            migrationBuilder.DropColumn(
                name: "AsignaturaId",
                table: "correlativas");
        }
    }
}
