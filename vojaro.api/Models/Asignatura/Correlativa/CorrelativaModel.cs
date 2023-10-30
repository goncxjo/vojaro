using System;
using vojaro.domain;

namespace vojaro.api.Models.Asignatura
{
    public class CorrelativaModel
    {
        public long Id { get; set; }
        public long AsignaturaId { get; set; }
        public ItemListModel Condicion { get; set; }
    }
}
