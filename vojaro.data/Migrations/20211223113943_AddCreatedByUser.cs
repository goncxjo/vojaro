using Microsoft.EntityFrameworkCore.Migrations;

namespace vojaro.data.Migrations
{
    public partial class AddCreatedByUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UsuarioUltimaModificacion",
                table: "universidades",
                type: "bigint",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UsuarioUltimaModificacion",
                table: "universidades");
        }
    }
}
