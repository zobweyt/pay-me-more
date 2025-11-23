from io import BytesIO

from src.api.resumes.parse.validators import is_pdf, is_size_in_range


def test_is_size_in_range_within_bounds() -> None:
    file = BytesIO(b"abc")
    assert is_size_in_range(file, min_size=1, max_size=5)


def test_is_size_in_range_below_minimum() -> None:
    file = BytesIO(b"abc")
    assert not is_size_in_range(file, min_size=4, max_size=10)


def test_is_size_in_range_above_maximum() -> None:
    file = BytesIO(b"abc")
    assert not is_size_in_range(file, min_size=0, max_size=2)


def test_is_pdf_detects_content_type() -> None:
    assert is_pdf("application/pdf")
    assert not is_pdf("text/plain")
    assert not is_pdf(None)
