using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace vojaro.api.Migrations
{
    public partial class AddCarrera : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "carreras",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nombre = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UniversidadId = table.Column<long>(type: "bigint", nullable: true),
                    DepartamentosId = table.Column<long>(type: "bigint", nullable: true),
                    FechaCreacion = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    FechaUltimaModificacion = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UsuarioUltimaModificacion = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_carreras", x => x.Id);
                    table.ForeignKey(
                        name: "FK_carreras_departamentos_DepartamentosId",
                        column: x => x.DepartamentosId,
                        principalTable: "departamentos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_carreras_universidades_UniversidadId",
                        column: x => x.UniversidadId,
                        principalTable: "universidades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_carreras_DepartamentosId",
                table: "carreras",
                column: "DepartamentosId");

            migrationBuilder.CreateIndex(
                name: "IX_carreras_UniversidadId",
                table: "carreras",
                column: "UniversidadId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "carreras");
        }
    }
}
