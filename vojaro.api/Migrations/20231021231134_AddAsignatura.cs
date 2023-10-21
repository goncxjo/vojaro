using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace vojaro.api.Migrations
{
    public partial class AddAsignatura : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "asignaturas",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Codigo = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Nombre = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Anio = table.Column<int>(type: "int", nullable: false),
                    Cuatrimestre = table.Column<int>(type: "int", nullable: false),
                    CargaHoraria = table.Column<int>(type: "int", nullable: false),
                    Creditos = table.Column<int>(type: "int", nullable: false),
                    EsInterdisciplinaria = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CarreraId = table.Column<long>(type: "bigint", nullable: false),
                    CarreraOrientacionId = table.Column<long>(type: "bigint", nullable: true),
                    FechaCreacion = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    FechaUltimaModificacion = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UsuarioUltimaModificacion = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_asignaturas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_asignaturas_carreras_CarreraId",
                        column: x => x.CarreraId,
                        principalTable: "carreras",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_asignaturas_carreras_orientaciones_CarreraOrientacionId",
                        column: x => x.CarreraOrientacionId,
                        principalTable: "carreras_orientaciones",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "correlativas",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Condicion = table.Column<int>(type: "int", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    FechaUltimaModificacion = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    UsuarioUltimaModificacion = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_correlativas", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "asignaturas_correlativas",
                columns: table => new
                {
                    AsignaturaId = table.Column<long>(type: "bigint", nullable: false),
                    CorrelativaId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_asignaturas_correlativas_asignaturas_AsignaturaId",
                        column: x => x.AsignaturaId,
                        principalTable: "asignaturas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_asignaturas_correlativas_correlativas_CorrelativaId",
                        column: x => x.CorrelativaId,
                        principalTable: "correlativas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_asignaturas_CarreraId",
                table: "asignaturas",
                column: "CarreraId");

            migrationBuilder.CreateIndex(
                name: "IX_asignaturas_CarreraOrientacionId",
                table: "asignaturas",
                column: "CarreraOrientacionId");

            migrationBuilder.CreateIndex(
                name: "IX_asignaturas_correlativas_AsignaturaId",
                table: "asignaturas_correlativas",
                column: "AsignaturaId");

            migrationBuilder.CreateIndex(
                name: "IX_asignaturas_correlativas_CorrelativaId",
                table: "asignaturas_correlativas",
                column: "CorrelativaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "asignaturas_correlativas");

            migrationBuilder.DropTable(
                name: "asignaturas");

            migrationBuilder.DropTable(
                name: "correlativas");
        }
    }
}
